type Location = {
    longitude?: number;
    latitude?: number;
    city?: string;
    state?: string;
    country?: string;
    fullAddress?: string;
};

export interface UserAvatar {
    url: string;
    public_id: string;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    avatar: UserAvatar;
    gender?: "male" | "female" | "Male" | "Female";
    location?: Location;
    verified: boolean;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
