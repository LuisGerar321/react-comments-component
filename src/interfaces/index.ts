export interface IComment {
  id: number;
  email: string;
  body: string;
  parentCommentId: number;
  replies: IComment[];
  updatedAt: string;
  createdAt: string;
}
