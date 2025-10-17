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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      businesses: {
        Row: {
          category: Database["public"]["Enums"]["business_category"]
          created_at: string
          description: string | null
          email: string
          id: string
          logo_url: string | null
          name: string
          owner_id: string
          phone: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["business_category"]
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          logo_url?: string | null
          name?: string
          owner_id: string
          phone?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["business_category"]
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          logo_url?: string | null
          name?: string
          owner_id?: string
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "public.profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      public_business_settings: {
        Row: {
          accept_payments: boolean | null
          auto_confirm_bookings: boolean | null
          booking_advance_days: number | null
          business_id: string
          cancellation_policy: string | null
          chat_enbled: boolean | null
          created_at: string
          custom_url: string
          id: string
          language: string | null
          notification_preferences: Json | null
          theme_color: string | null
          updated_at: string
        }
        Insert: {
          accept_payments?: boolean | null
          auto_confirm_bookings?: boolean | null
          booking_advance_days?: number | null
          business_id: string
          cancellation_policy?: string | null
          chat_enbled?: boolean | null
          created_at?: string
          custom_url: string
          id?: string
          language?: string | null
          notification_preferences?: Json | null
          theme_color?: string | null
          updated_at?: string
        }
        Update: {
          accept_payments?: boolean | null
          auto_confirm_bookings?: boolean | null
          booking_advance_days?: number | null
          business_id?: string
          cancellation_policy?: string | null
          chat_enbled?: boolean | null
          created_at?: string
          custom_url?: string
          id?: string
          language?: string | null
          notification_preferences?: Json | null
          theme_color?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_business_settings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      public_reviews: {
        Row: {
          business_id: string
          client_id: string
          comment: string | null
          created_at: string
          id: string
          rating: number
          submitted_at: string
          updated_at: string
        }
        Insert: {
          business_id: string
          client_id: string
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          business_id?: string
          client_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          submitted_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_reviews_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_reviews_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "public.profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      "public.analytics_events": {
        Row: {
          business_id: string | null
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          ip_address: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public.analytics_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public.analytics_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public.profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      "public.appointments": {
        Row: {
          appointment_date: string
          appointment_time: string
          business_id: string
          client_id: string
          created_at: string
          id: string
          notes: string | null
          service_id: string
          status: Database["public"]["Enums"]["appointment_status"] | null
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          business_id: string
          client_id: string
          created_at?: string
          id?: string
          notes?: string | null
          service_id?: string
          status?: Database["public"]["Enums"]["appointment_status"] | null
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          business_id?: string
          client_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          service_id?: string
          status?: Database["public"]["Enums"]["appointment_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public.appointments_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public.appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "public.profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public.appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "public.services"
            referencedColumns: ["id"]
          },
        ]
      }
      "public.audit_logs": {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: string | null
          new_valeus: Json | null
          old_value: Json | null
          ressource_id: string
          ressource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: string | null
          new_valeus?: Json | null
          old_value?: Json | null
          ressource_id: string
          ressource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          new_valeus?: Json | null
          old_value?: Json | null
          ressource_id?: string
          ressource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public.audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public.profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      "public.locations": {
        Row: {
          business_id: string | null
          city: string | null
          country: string | null
          created_at: string
          full_address: string | null
          id: string
          latitude: number | null
          longitude: number | null
          state: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          city?: string | null
          country?: string | null
          created_at: string
          full_address?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          state?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          full_address?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          state?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public.locations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public.locations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public.profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      "public.messages": {
        Row: {
          content: string
          created_at: string
          id: string
          receiver_id: string
          sender_id: string
          sent_at: string
        }
        Insert: {
          content: string
          created_at: string
          id?: string
          receiver_id: string
          sender_id: string
          sent_at: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          receiver_id?: string
          sender_id?: string
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public.messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "public.profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public.messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "public.profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      "public.notifications": {
        Row: {
          business_id: string | null
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          message: string | null
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          type: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public.notifications_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public.notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public.profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      "public.profiles": {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      "public.services": {
        Row: {
          business_id: string | null
          created_at: string
          description: string
          duration_minute: number | null
          id: string
          is_active: boolean | null
          name: string
          price: number | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string
          description: string
          duration_minute?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          price?: number | null
        }
        Update: {
          business_id?: string | null
          created_at?: string
          description?: string
          duration_minute?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public.services_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      "public.subscriptions": {
        Row: {
          business_id: string
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan: string
          status: string
          stripe_subscription_id: string | null
          trial_end: string | null
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan?: string
          status?: string
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan?: string
          status?: string
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public.subscriptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      "public.support": {
        Row: {
          assigned_to: string
          business_id: string | null
          category: string
          created_at: string
          description: string
          id: string
          priority: string
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_to: string
          business_id?: string | null
          category: string
          created_at?: string
          description: string
          id?: string
          priority?: string
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_to?: string
          business_id?: string | null
          category?: string
          created_at?: string
          description?: string
          id?: string
          priority?: string
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public.support_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "public.profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public.support_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public.support_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public.profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      "public.team": {
        Row: {
          created_at: string
          department: string | null
          id: string
          invited_at: string | null
          invited_by: string | null
          is_active: boolean | null
          joined_at: string
          permissions: string[] | null
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          is_active?: boolean | null
          joined_at?: string
          permissions?: string[] | null
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          is_active?: boolean | null
          joined_at?: string
          permissions?: string[] | null
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public.team_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "public.profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public.team_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public.profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      "public.transactions": {
        Row: {
          amount: number
          appointment_id: string | null
          business_id: string
          client_id: string
          created_at: string
          id: string
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          status: Database["public"]["Enums"]["transaction_status"] | null
          stripe_payment_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          appointment_id?: string | null
          business_id: string
          client_id: string
          created_at?: string
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          stripe_payment_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          appointment_id?: string | null
          business_id?: string
          client_id?: string
          created_at?: string
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          stripe_payment_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public.transactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "public.appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public.transactions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public.transactions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "public.profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_business_owner: {
        Args: { business_id: string }
        Returns: boolean
      }
    }
    Enums: {
      appointment_status: "pending" | "confirmed" | "cancelled" | "completed"
      business_category:
        | "restaurant"
        | "salon"
        | "hotel"
        | "lawyer"
        | "real_estate"
        | "mechanic"
        | "healthcare"
        | "fitness"
        | "beauty"
        | "education"
        | "other"
      notification_type:
        | "booking"
        | "reminder"
        | "cancellation"
        | "payment"
        | "general"
      payment_method: "card" | "cash" | "bank_transfer"
      send_method: "sms" | "email" | "both"
      transaction_status: "pending" | "completed" | "failed" | "refunded"
      user_role: "client" | "business" | "admin"
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
    Enums: {
      appointment_status: ["pending", "confirmed", "cancelled", "completed"],
      business_category: [
        "restaurant",
        "salon",
        "hotel",
        "lawyer",
        "real_estate",
        "mechanic",
        "healthcare",
        "fitness",
        "beauty",
        "education",
        "other",
      ],
      notification_type: [
        "booking",
        "reminder",
        "cancellation",
        "payment",
        "general",
      ],
      payment_method: ["card", "cash", "bank_transfer"],
      send_method: ["sms", "email", "both"],
      transaction_status: ["pending", "completed", "failed", "refunded"],
      user_role: ["client", "business", "admin"],
    },
  },
} as const
