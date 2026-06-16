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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          country: string
          created_at: string
          full_name: string
          id: string
          is_default: boolean
          line1: string
          line2: string | null
          phone: string
          pincode: string
          state: string
          user_id: string
        }
        Insert: {
          city: string
          country?: string
          created_at?: string
          full_name: string
          id?: string
          is_default?: boolean
          line1: string
          line2?: string | null
          phone: string
          pincode: string
          state: string
          user_id: string
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          full_name?: string
          id?: string
          is_default?: boolean
          line1?: string
          line2?: string | null
          phone?: string
          pincode?: string
          state?: string
          user_id?: string
        }
        Relationships: []
      }
      banners: {
        Row: {
          created_at: string
          cta_link: string | null
          cta_text: string | null
          id: string
          image_url: string | null
          is_active: boolean
          position: string
          sort_order: number
          subtitle: string | null
          title: string
        }
        Insert: {
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          position?: string
          sort_order?: number
          subtitle?: string | null
          title: string
        }
        Update: {
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          position?: string
          sort_order?: number
          subtitle?: string | null
          title?: string
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          created_at: string
          id: string
          quantity: number
          user_id: string
          variant_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          quantity?: number
          user_id: string
          variant_id: string
        }
        Update: {
          created_at?: string
          id?: string
          quantity?: number
          user_id?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          description: string | null
          discount_type: string
          discount_value: number
          expires_at: string | null
          id: string
          is_active: boolean
          min_order: number
          usage_limit: number | null
          used_count: number
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          discount_type: string
          discount_value: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          min_order?: number
          usage_limit?: number | null
          used_count?: number
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          min_order?: number
          usage_limit?: number | null
          used_count?: number
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          image_url: string | null
          order_id: string
          product_id: string | null
          product_name: string
          quantity: number
          total_price: number
          unit_price: number
          variant_id: string | null
          variant_label: string | null
        }
        Insert: {
          id?: string
          image_url?: string | null
          order_id: string
          product_id?: string | null
          product_name: string
          quantity: number
          total_price: number
          unit_price: number
          variant_id?: string | null
          variant_label?: string | null
        }
        Update: {
          id?: string
          image_url?: string | null
          order_id?: string
          product_id?: string | null
          product_name?: string
          quantity?: number
          total_price?: number
          unit_price?: number
          variant_id?: string | null
          variant_label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          coupon_code: string | null
          created_at: string
          customer_email: string | null
          customer_phone: string | null
          discount: number
          id: string
          notes: string | null
          order_number: string
          payment_method: string
          payment_status: Database["public"]["Enums"]["payment_status"]
          shipping: number
          shipping_address: Json
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number
          tax: number
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          coupon_code?: string | null
          created_at?: string
          customer_email?: string | null
          customer_phone?: string | null
          discount?: number
          id?: string
          notes?: string | null
          order_number: string
          payment_method?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          shipping?: number
          shipping_address: Json
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          tax?: number
          total?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          coupon_code?: string | null
          created_at?: string
          customer_email?: string | null
          customer_phone?: string | null
          discount?: number
          id?: string
          notes?: string | null
          order_number?: string
          payment_method?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          shipping?: number
          shipping_address?: Json
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          tax?: number
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      product_variants: {
        Row: {
          color: string | null
          created_at: string
          id: string
          price_override: number | null
          product_id: string
          size: string | null
          sku: string | null
          stock: number
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          price_override?: number | null
          product_id: string
          size?: string | null
          sku?: string | null
          stock?: number
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          price_override?: number | null
          product_id?: string
          size?: string | null
          sku?: string | null
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand: string | null
          category_id: string | null
          created_at: string
          description: string | null
          discount_price: number | null
          id: string
          images: Json
          is_active: boolean
          is_bestseller: boolean
          is_featured: boolean
          is_new: boolean
          is_trending: boolean
          name: string
          price: number
          rating_avg: number
          rating_count: number
          sku: string
          slug: string
          tags: string[]
          updated_at: string
          weight_grams: number | null
        }
        Insert: {
          brand?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          discount_price?: number | null
          id?: string
          images?: Json
          is_active?: boolean
          is_bestseller?: boolean
          is_featured?: boolean
          is_new?: boolean
          is_trending?: boolean
          name: string
          price: number
          rating_avg?: number
          rating_count?: number
          sku: string
          slug: string
          tags?: string[]
          updated_at?: string
          weight_grams?: number | null
        }
        Update: {
          brand?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          discount_price?: number | null
          id?: string
          images?: Json
          is_active?: boolean
          is_bestseller?: boolean
          is_featured?: boolean
          is_new?: boolean
          is_trending?: boolean
          name?: string
          price?: number
          rating_avg?: number
          rating_count?: number
          sku?: string
          slug?: string
          tags?: string[]
          updated_at?: string
          weight_grams?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          body: string | null
          created_at: string
          id: string
          product_id: string
          rating: number
          title: string | null
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          product_id: string
          rating: number
          title?: string | null
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          product_id?: string
          rating?: number
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wishlist: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      lookup_coupon: {
        Args: { _code: string }
        Returns: {
          code: string
          discount_type: string
          discount_value: number
          expires_at: string
          min_order: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "customer"
      order_status:
        | "pending"
        | "confirmed"
        | "packed"
        | "shipped"
        | "out_for_delivery"
        | "delivered"
        | "cancelled"
        | "returned"
      payment_status: "pending" | "paid" | "failed" | "refunded"
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
      app_role: ["admin", "customer"],
      order_status: [
        "pending",
        "confirmed",
        "packed",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned",
      ],
      payment_status: ["pending", "paid", "failed", "refunded"],
    },
  },
} as const
