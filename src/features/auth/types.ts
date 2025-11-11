export type LoginActionState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export type SignupActionState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};
