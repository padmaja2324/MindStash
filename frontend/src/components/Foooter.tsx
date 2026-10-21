import {  Twitter, Instagram,  Github, Mail, Linkedin } from 'lucide-react';
const Foooter = () => {
  return (
    <footer className="w-full border-t mt-20 border-gray-200 px-6 py-10 bg-white font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Left Section: Brand & Copyright */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold tracking-widest text-black uppercase">
            Mind Stash
          </h2>
          <p className="text-xs text-gray-500 tracking-wider uppercase">
            © Copyright 2024 | All Rights Reserved
          </p>
        </div>

        {/* Right Section: Socials & Contact */}
        <div className="flex flex-col items-end gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-5 text-black">
            <a href="https://www.linkedin.com/in/nishaad-dhabale-7a6466298/" target="_blank" className="hover:opacity-60 transition-opacity"><Linkedin size={20} /></a>
            <a href="https://x.com/trynabegeekie" className="hover:opacity-60 transition-opacity" target="_blank"><Twitter size={20} /></a>
            <a href="https://www.instagram.com/spud_niko/" className="hover:opacity-60 transition-opacity " target="_blank"><Instagram size={20} /></a>
            
            <a href="https://github.com/padmaja2324" className="hover:opacity-60 transition-opacity" target="_blank"><Github size={20} /></a>
            
          </div>

          {/* Email Link */}
          <div className="flex items-center gap-2 text-black">
            <Mail size={18} />
            <a 
              href="mailto:MNI@MEDNEWSINDIA.COM" 
              className="text-sm font-bold tracking-wider hover:underline"
            >
              sirmewarpadmaja2324@gmail.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Foooter;