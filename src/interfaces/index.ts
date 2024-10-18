export interface IComment {
  id: number;
  email: string;
  body: string;
  parentCommentId: string;
  replies: IComment[];
  updatedAt: string;
  createdAt: string;
}
