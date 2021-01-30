import { GraphGLVariableTypes } from "../dist";

export interface ErrorDTO {
    message: string;
}

export interface PostDTO {
    id: number;
    title: string;
    message: string;
    hits: number;
    user: UserDTO;
}

export interface UserDTO {
    id: string;
    name: string;
    icon: string;
    age: number;
    posts: PostDTO[];
}

export interface QueryUserVariables {
    id: string;
}

export const queryUserVariableTypes: GraphGLVariableTypes<QueryUserVariables> = {
    id: "String!",
};
