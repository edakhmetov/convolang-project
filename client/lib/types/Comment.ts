export default interface Comment {
  content: string;
  owner: {
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
}
