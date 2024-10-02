import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id', { length: 21 }).primaryKey(),
  username: varchar('username', { length: 255 }).unique().notNull(),
  displayName: text('display_name'),
  email: varchar('email', { length: 255 }).unique().notNull(),
  googleId: text('google_id').unique(),
  avatarUrl: text('avatar_url'),
  bio: text('bio'),
  hashedPassword: varchar('hashed_password', { length: 255 }).notNull(),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 191 }),
  stripePriceId: varchar('stripe_price_id', { length: 191 }),
  stripeCustomerId: varchar('stripe_customer_id', { length: 191 }),
  stripeCurrentPeriodEnd: timestamp('stripe_current_period_end'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).$onUpdate(
    () => new Date(),
  ),
});

export type SelectUser = typeof users.$inferSelect;

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});
