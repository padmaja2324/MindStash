interface InputProps {
  placeholder: string;
  reference?: any;
  type?:string;
}

export function Input({ placeholder, reference,type }: InputProps) {
  return (
    <div>
      <input
        ref={reference}
        placeholder={placeholder}
        type={type}
        className="px-4 py-2 border rounded m-2"
      ></input>
    </div>
  );
}
