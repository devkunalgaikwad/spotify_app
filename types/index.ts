import { SupabaseClient, User } from '@supabase/supabase-js';
import React from 'react';
import {IconType} from 'react-icons'
import Stripe from 'stripe';

export interface boxProps{
    children :React.ReactNode;
    className ?: string;
}
export interface sideBarProps{
    children :React.ReactNode;
    songs : Song[];
}

export interface SideBarItemProps {
    icon : IconType;
    label : string;
    active ?: boolean;
    href : string;
}

export interface HeaderProps {
    children : React.ReactNode;
    className ?: string;
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

export interface ListItemProps {
    name: string;
    href : string;
}

export interface SupabaseProviderProps {
    children : React.ReactNode;
};

export interface UserDetails {
    id : string;
    first_name : string;
    last_name : string;
    full_name : string;
    avatar_url : string;
    billing_address ?: Stripe.Address;
    payment_method ?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
};

export interface Product {
    id : string;
    active ?: boolean;
    name ?: string;
    description ?: string;
    metadata ?: Stripe.Metadata;
    image ?: string;
}
export interface Price {
    id : string;
    product_id ?: string;
    active ?: boolean;
    description ?: string;
    unit_amount ?:number;
    currency ?: string;
    type ?: Stripe.Price.Type;
    interval ?: Stripe.Price.Recurring.Interval;
    interval_count ?: number;
    trial_period_days ?: number | null;
    metadata ?: Stripe.Metadata;
    products ?: Product;
}
export interface Subscription {
    id : string;
    user_id : string;
    status?: Stripe.Subscription.Status;
    metadata ?: Stripe.Metadata;
    price_id ?: string;
    quantity ?: number;
    cancel_at_period_end ?: boolean;
    created : string;
    current_period_start : string;
    current_period_end : string;
    ended_at ?: string;
    cancel ?:string;
    canceled_at ?: string;
    trial_start ?: string;
    trial_end ?: string;
    prices ?: Price;
};

export interface UserContextType {
    accessToken : string |null;
    user : User | null;
    userDetails : UserDetails |null;
    isLoading : boolean;
    subscription : Subscription |null;
};

export interface Props {
    [propName : string] : any;
};

export interface UserProviderProps {
    children : React.ReactNode;
}

export interface modalProps {
    isOpen : boolean;
    onChange : (open : boolean) => void;
    title  :string;
    description : string;
    children  : React.ReactNode;
}

export interface useAuthModalProps { 
    isOpen : boolean;
    onOpen : ()=>void;
    onClose  : ()=>void;
}
export interface useSubscribeModal { 
    isOpen : boolean;
    onOpen : ()=>void;
    onClose  : ()=>void;
}

export interface inputProps extends React.InputHTMLAttributes<HTMLInputElement>{}

export interface Song {
    id : string;
    user_id : string;
    author :string;
    title : string;
    song_path : string;
    image_path : string;
}

export interface SongItemProps {
    data : Song;
    onClick : (id:string)=> void;
}

export interface PageContentProps {
    songs : Song[];
}

export interface LibrayProps{
    songs : Song[]
}

export interface PlayListItemProps {
    data : Song;
    onClick ?: (id:string)=>void;
}

export interface SearchProps{
    searchParams:{
        title:string;
    }
}

export interface SearchContentProps {
    songs : Song[];
}

export interface LikeButtonProps {
    songId : string;
}

export interface LikedContentProps {
    songs : Song[];
}

export interface PlayerStoreProps{
    ids : string[];
    activeId ?: string;
    setId : (id:string)=>void
    setIds : (ids:string[])=>void
    reset : ()=>void
}

export interface PlayerContentProps {
    song: Song;
    songUrl : string;
}

export interface SliderProps {
    value ?: number;
    onChange?: (value:number)=>void;
}

export interface SeekbarProps {
     value ?: number;
     max : number;
     onChange ?: (value:number)=>void;
}

export interface ProductWithPrice extends Product{
    prices ?: Price[]
}