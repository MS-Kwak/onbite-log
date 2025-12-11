export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      Book: {
        Row: {
          author: string | null
          coverImgUrl: string | null
          description: string | null
          id: number | null
          publisher: string | null
          searchIndex: string | null
          subTitle: string | null
          title: string | null
        }
        Insert: {
          author?: string | null
          coverImgUrl?: string | null
          description?: string | null
          id?: number | null
          publisher?: string | null
          searchIndex?: string | null
          subTitle?: string | null
          title?: string | null
        }
        Update: {
          author?: string | null
          coverImgUrl?: string | null
          description?: string | null
          id?: number | null
          publisher?: string | null
          searchIndex?: string | null
          subTitle?: string | null
          title?: string | null
        }
        Relationships: []
      }
      logPost: {
        Row: {
          auth_id: string
          content: string
          created_at: string
          id: number
          img_urls: string[] | null
          like_count: number
        }
        Insert: {
          auth_id?: string
          content?: string
          created_at?: string
          id?: number
          img_urls?: string[] | null
          like_count?: number
        }
        Update: {
          auth_id?: string
          content?: string
          created_at?: string
          id?: number
          img_urls?: string[] | null
          like_count?: number
        }
        Relationships: []
      }
      message: {
        Row: {
          created_at: string
          id: number
          is_deleted: boolean
          message: string
          receiver: string
          sender: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_deleted?: boolean
          message: string
          receiver: string
          sender?: string
        }
        Update: {
          created_at?: string
          id?: number
          is_deleted?: boolean
          message?: string
          receiver?: string
          sender?: string
        }
        Relationships: []
      }
      movie: {
        Row: {
          image_url: string | null
          overview: string | null
          popularity: number | null
          release_date: string | null
          title: string | null
          vote_average: number | null
        }
        Insert: {
          image_url?: string | null
          overview?: string | null
          popularity?: number | null
          release_date?: string | null
          title?: string | null
          vote_average?: number | null
        }
        Update: {
          image_url?: string | null
          overview?: string | null
          popularity?: number | null
          release_date?: string | null
          title?: string | null
          vote_average?: number | null
        }
        Relationships: []
      }
      note: {
        Row: {
          content: string | null
          created_at: string | null
          id: number | null
          title: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number | null
          title?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number | null
          title?: string | null
        }
        Relationships: []
      }
      Review: {
        Row: {
          author: string | null
          bookId: number | null
          content: string | null
          createdAt: string | null
          id: number | null
        }
        Insert: {
          author?: string | null
          bookId?: number | null
          content?: string | null
          createdAt?: string | null
          id?: number | null
        }
        Update: {
          author?: string | null
          bookId?: number | null
          content?: string | null
          createdAt?: string | null
          id?: number | null
        }
        Relationships: []
      }
      todo: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          email_verified: boolean | null
          full_name: string | null
          id: string
          last_sign_in_at: string | null
          nickname: string | null
          provider: string | null
          provider_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          email_verified?: boolean | null
          full_name?: string | null
          id: string
          last_sign_in_at?: string | null
          nickname?: string | null
          provider?: string | null
          provider_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          last_sign_in_at?: string | null
          nickname?: string | null
          provider?: string | null
          provider_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
