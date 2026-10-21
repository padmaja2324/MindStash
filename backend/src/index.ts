/// <reference types="node" />

import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { ContentModel, LinkModel, UserModel } from './db';
import { JWT_PASSWORD } from './config';
import { userMiddleware } from './middleware';
import cors from 'cors';
import { random } from './utils';
const app = express();

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cors());
app.post('/api/v1/signup', async (req, res) => {
  // TODO: zod validation , hash the password
  const username = req.body.username;
  const password = req.body.password;

  try {
    await UserModel.create({
      username: username,
      password: password,
    });

    res.json({
      message: 'User signed up',
    });
  } catch (e) {
    res.status(411).json({
      message: 'User already exists',
    });
  }
});

app.post('/api/v1/signin', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await UserModel.findOne({
    username,
    password,
  });
  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_PASSWORD
    );

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: 'Incorrrect credentials',
    });
  }
});

app.post('/api/v1/content', userMiddleware, async (req, res) => {
  const { link, type, title, description, position, imageUrl, fileUrl, fileName } = req.body;
  // @ts-ignore
  const count = await ContentModel.countDocuments({ userId: req.userId });
  const newContent = await ContentModel.create({
    link: link || '',
    type: type || 'website',
    //@ts-ignore
    userId: req.userId,
    title: title || 'Untitled',
    description: description || '',
    position: position || { x: 0, y: 0 },
    imageUrl: imageUrl || '',
    fileUrl: fileUrl || '',
    fileName: fileName || '',
    tags: [],
    order: count,
  });

  res.json({
    message: 'Content added',
    content: newContent,
  });
});

app.patch('/api/v1/content/:id/position', userMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { x, y } = req.body;

    if (typeof x !== 'number' || typeof y !== 'number') {
      res.status(400).json({ message: 'Invalid position coordinates' });
      return;
    }

    const updatedContent = await ContentModel.findOneAndUpdate(
      {
        _id: id,
        //@ts-ignore
        userId: req.userId,
      },
      {
        $set: {
          'position.x': x,
          'position.y': y,
        },
      },
      { new: true }
    );

    if (!updatedContent) {
      res.status(404).json({ message: 'Content not found or unauthorized' });
      return;
    }

    res.json({
      message: 'Position updated successfully',
      position: updatedContent.position,
    });
  } catch (error) {
    console.error('Error updating position:', error);
    res.status(500).json({ message: 'Failed to update position' });
  }
});

app.patch('/api/v1/content/reorder', userMiddleware, async (req, res) => {
  try {
    const { updates } = req.body;

    if (!Array.isArray(updates)) {
      res.status(400).json({ message: 'Updates must be an array' });
      return;
    }

    const bulkOps = updates.map((update: any) => ({
      updateOne: {
        // @ts-ignore
        filter: { _id: update.id, userId: req.userId },
        update: { $set: { order: update.order } },
      }
    }));

    await ContentModel.bulkWrite(bulkOps);

    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error reordering content:', error);
    res.status(500).json({ message: 'Failed to reorder content' });
  }
});

app.get('/api/v1/content', userMiddleware, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate('userId', 'username').sort({ order: 1 });
  res.json({
    content,
  });
});

app.delete('/api/v1/content', userMiddleware, async (req, res) => {
  try {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
      _id: contentId,
      // @ts-ignore
      userId: req.userId,
    });

    res.json({
      message: 'Deleted',
    });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({
      message: 'Something went wrong while deleting content',
      error: error instanceof Error ? error.message : error,
    });
  }
});

app.post('/api/v1/brain/share', userMiddleware, async (req, res) => {
  const share = req.body.share;
  if (share) {
    const existingLink = await LinkModel.findOne({
      //@ts-ignore
      userId: req.userId,
    });

    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }
    const hash = random(10);
    await LinkModel.create({
      //@ts-ignore
      userId: req.userId,
      hash: hash,
    });

    res.json({
      hash,
    });
  } else {
    await LinkModel.deleteOne({
      //@ts-ignore
      userId: req.userId,
    });

    res.json({
      message: 'Removed link',
    });
  }
});

app.get('/api/v1/brain/:shareLink', async (req, res) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({
      message: 'Sorry incorrect input',
    });
    return;
  }
  // userId
  const content = await ContentModel.find({
    userId: link.userId,
  }).sort({ order: 1 });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(411).json({
      message: 'user not found, error should ideally not happen',
    });
    return;
  }

  res.json({
    username: user.username,
    content: content,
  });
});
app.listen(3000);
