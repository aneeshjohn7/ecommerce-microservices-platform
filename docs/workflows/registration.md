                         USER REGISTRATION
                                │
                                │ POST /auth/register
                                ▼
                    ┌───────────────────────┐
                    │    Identity Service   │
                    │   Node.js + Express   │
                    └───────────┬───────────┘
                                │
                                │ 1. Validate request
                                │ 2. Hash password
                                │ 3. Create user
                                │ 4. Generate verification token
                                │ 5. Save token + expiry
                                │
                                ▼
                    ┌───────────────────────┐
                    │      PostgreSQL       │
                    │        Prisma         │
                    └───────────────────────┘
                               
                                │
                                │ 6. Publish UserRegistered event
                                ▼
                    ┌───────────────────────┐
                    │       RabbitMQ        │
                    │     Message Broker     │
                    └───────────┬───────────┘
                                │
                                │ 7. Consume event
                                ▼
                    ┌───────────────────────┐
                    │     Email Worker      │
                    │   Node.js Process     │
                    └───────────┬───────────┘
                                │
                                │ 8. Build email
                                ▼
                    ┌───────────────────────┐
                    │      Nodemailer       │
                    │     Email Client      │
                    └───────────┬───────────┘
                                │
                                │ 9. SMTP
                                ▼
                    ┌───────────────────────┐
                    │      Amazon SES       │
                    │   Email Delivery      │
                    └───────────┬───────────┘
                                │
                                │ 10. Deliver email
                                ▼
                         ┌──────────────┐
                         │ User's Inbox │
                         └──────┬───────┘
                                │
                                │ 11. Click verification link
                                ▼
                    GET /auth/verify-email
                                │
                                ▼
                    ┌───────────────────────┐
                    │    Identity Service   │
                    └───────────┬───────────┘
                                │
                                │ 12. Validate token
                                │ 13. Check expiration
                                │ 14. Set emailVerified = true
                                ▼
                    ┌───────────────────────┐
                    │      PostgreSQL       │
                    │ emailVerified = true │
                    └───────────────────────┘