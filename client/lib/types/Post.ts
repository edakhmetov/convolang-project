export default interface Post {
  id: number;
  owner: {
    id: number;
    firstName: string;
    lastName: string;
  };
  content: string;
  createdAt: Date;
}
