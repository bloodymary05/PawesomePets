export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      adoption_applications: {
        Row: {
          address: string
          application_date: string | null
          approval_date: string | null
          city: string
          contact_phone: string
          created_at: string | null
          experience: string | null
          has_yard: boolean | null
          housing_type: string
          id: string
          other_pets: string | null
          pet_id: string | null
          rejection_reason: string | null
          state: string
          status: string | null
          user_id: string
          zip_code: string
        }
        Insert: {
          address: string
          application_date?: string | null
          approval_date?: string | null
          city: string
          contact_phone: string
          created_at?: string | null
          experience?: string | null
          has_yard?: boolean | null
          housing_type: string
          id?: string
          other_pets?: string | null
          pet_id?: string | null
          rejection_reason?: string | null
          state: string
          status?: string | null
          user_id: string
          zip_code: string
        }
        Update: {
          address?: string
          application_date?: string | null
          approval_date?: string | null
          city?: string
          contact_phone?: string
          created_at?: string | null
          experience?: string | null
          has_yard?: boolean | null
          housing_type?: string
          id?: string
          other_pets?: string | null
          pet_id?: string | null
          rejection_reason?: string | null
          state?: string
          status?: string | null
          user_id?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "adoption_applications_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consultations: {
        Row: {
          consultation_type: string
          created_at: string | null
          email: string
          id: string
          message: string | null
          name: string
          pet_type: string
          phone: string
          preferred_date: string
          status: string | null
        }
        Insert: {
          consultation_type: string
          created_at?: string | null
          email: string
          id?: string
          message?: string | null
          name: string
          pet_type: string
          phone: string
          preferred_date: string
          status?: string | null
        }
        Update: {
          consultation_type?: string
          created_at?: string | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          pet_type?: string
          phone?: string
          preferred_date?: string
          status?: string | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          donated_at: string | null
          donation_id: number
          email: string
          first_name: string
          frequency: string | null
          last_name: string
          message: string | null
        }
        Insert: {
          amount: number
          donated_at?: string | null
          donation_id?: number
          email: string
          first_name: string
          frequency?: string | null
          last_name: string
          message?: string | null
        }
        Update: {
          amount?: number
          donated_at?: string | null
          donation_id?: number
          email?: string
          first_name?: string
          frequency?: string | null
          last_name?: string
          message?: string | null
        }
        Relationships: []
      }
      pet_profiles: {
        Row: {
          age: number
          arrival_date: string | null
          breed: string
          color: string | null
          description: string
          dislikes: string[] | null
          featured: boolean | null
          gender: string
          id: string
          image_url: string | null
          likes: string[] | null
          medical_history: string | null
          name: string
          shelter_id: string | null
          size: string | null
          special_needs: boolean | null
          special_needs_details: string | null
          status: string | null
          type: string
        }
        Insert: {
          age: number
          arrival_date?: string | null
          breed: string
          color?: string | null
          description: string
          dislikes?: string[] | null
          featured?: boolean | null
          gender: string
          id?: string
          image_url?: string | null
          likes?: string[] | null
          medical_history?: string | null
          name: string
          shelter_id?: string | null
          size?: string | null
          special_needs?: boolean | null
          special_needs_details?: string | null
          status?: string | null
          type: string
        }
        Update: {
          age?: number
          arrival_date?: string | null
          breed?: string
          color?: string | null
          description?: string
          dislikes?: string[] | null
          featured?: boolean | null
          gender?: string
          id?: string
          image_url?: string | null
          likes?: string[] | null
          medical_history?: string | null
          name?: string
          shelter_id?: string | null
          size?: string | null
          special_needs?: boolean | null
          special_needs_details?: string | null
          status?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "pet_profiles_shelter_id_fkey"
            columns: ["shelter_id"]
            isOneToOne: false
            referencedRelation: "shelters"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_types: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      shelters: {
        Row: {
          address: string
          city: string
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string
          state: string
          website: string | null
          zip_code: string
        }
        Insert: {
          address: string
          city: string
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone: string
          state: string
          website?: string | null
          zip_code: string
        }
        Update: {
          address?: string
          city?: string
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string
          state?: string
          website?: string | null
          zip_code?: string
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          adoption_date: string | null
          created_at: string | null
          id: string
          image_url: string | null
          owner_name: string
          pet_name: string
          pet_type: string
          story: string
          user_id: string | null
        }
        Insert: {
          adoption_date?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          owner_name: string
          pet_name: string
          pet_type: string
          story: string
          user_id?: string | null
        }
        Update: {
          adoption_date?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          owner_name?: string
          pet_name?: string
          pet_type?: string
          story?: string
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: number
          name: string
          password: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          name: string
          password: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          name?: string
          password?: string
        }
        Relationships: []
      }
      veterinarians: {
        Row: {
          city: string
          created_at: string | null
          email: string
          id: string
          image_url: string | null
          name: string
          phone: string
          specialty: string
          state: string
        }
        Insert: {
          city: string
          created_at?: string | null
          email: string
          id?: string
          image_url?: string | null
          name: string
          phone: string
          specialty: string
          state: string
        }
        Update: {
          city?: string
          created_at?: string | null
          email?: string
          id?: string
          image_url?: string | null
          name?: string
          phone?: string
          specialty?: string
          state?: string
        }
        Relationships: []
      }
      volunteering: {
        Row: {
          address: string
          availability: string[]
          city: string
          created_at: string | null
          email: string
          experience: string | null
          id: string
          interests: string[]
          message: string | null
          name: string
          phone: string
          state: string
          status: string | null
          user_id: string
          zip_code: string
        }
        Insert: {
          address: string
          availability: string[]
          city: string
          created_at?: string | null
          email: string
          experience?: string | null
          id?: string
          interests: string[]
          message?: string | null
          name: string
          phone: string
          state: string
          status?: string | null
          user_id: string
          zip_code: string
        }
        Update: {
          address?: string
          availability?: string[]
          city?: string
          created_at?: string | null
          email?: string
          experience?: string | null
          id?: string
          interests?: string[]
          message?: string | null
          name?: string
          phone?: string
          state?: string
          status?: string | null
          user_id?: string
          zip_code?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
