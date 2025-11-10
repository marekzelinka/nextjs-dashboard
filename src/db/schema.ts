import { relations, sql } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: text().unique().notNull(),
  password: text().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  invoices: many(invoices),
  customers: many(customers),
}));

export const customers = pgTable("customers", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const customersRelations = relations(customers, ({ one, many }) => ({
  owner: one(users, {
    fields: [customers.userId],
    references: [users.id],
  }),
  invoices: many(invoices),
}));

export const statusEnum = pgEnum("status", ["paid", "pending"]);

export const invoices = pgTable("invoices", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  customerId: uuid("customer_id")
    .references(() => customers.id, { onDelete: "cascade" })
    .notNull(),
  amount: integer().notNull(),
  status: statusEnum().notNull(),
  date: date().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const invoicesRelations = relations(invoices, ({ one }) => ({
  owner: one(users, {
    fields: [invoices.userId],
    references: [users.id],
  }),
  customer: one(customers, {
    fields: [invoices.customerId],
    references: [customers.id],
  }),
}));
