export type SignInActionState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export type SignUpActionState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};
