export interface IReview {
  comment: string;
  reviewer: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  reviews: IReview[];
}

export interface IUser {
  id: number;
  name: string;
  isAdmin: boolean;
}
