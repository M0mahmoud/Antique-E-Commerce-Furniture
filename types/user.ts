export interface UserAvatar {
    url: string;
    public_id: string;
}

export interface User {
    avatar: UserAvatar;
    _id: string;
    username: string;
    email: string;
    role: string;
    verified: boolean;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}
