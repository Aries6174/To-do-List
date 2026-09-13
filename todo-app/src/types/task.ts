  export type Task ={
    id:number;
    title:string;
    description:string;
    category:string;
    dueDate:string;
    priority:"low" | "mid" | "high";
    favorite:boolean;
    completed:boolean;
  };