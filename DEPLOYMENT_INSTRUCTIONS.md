# Deployment Instructions for VARU CRUD Implementation

## Overview
This document provides instructions for deploying the new CRUD functionality for clients, suppliers, and movements in the VARU inventory management system.

## Prerequisites
- Node.js 18+ installed
- Access to the Turso database
- Prisma CLI installed globally (`npm install -g prisma`)

## Deployment Steps

### 1. Apply Database Migrations
Since the application uses Turso as the database, you need to apply the migrations to create the new tables and update existing ones.

```bash
# Navigate to the project directory
cd /path/to/varu

# Apply the migrations
npx prisma migrate deploy
```

This will apply all pending migrations, including the one we created for adding client, supplier, and movement fields.

### 2. Generate Prisma Client
After applying migrations, regenerate the Prisma client to ensure it reflects the new schema:

```bash
npx prisma generate
```

### 3. Build the Application
Build the Next.js application for production:

```bash
npm run build
```

### 4. Start the Application
Start the application in production mode:

```bash
npm start
```

Or if you're using a process manager like PM2:

```bash
pm2 start npm --name "varu" -- start
```

## Database Schema Changes

### New Tables
1. `Client` - Stores client information
2. `WarehouseMeta` - Stores additional warehouse information (was missing from previous schema)

### Modified Tables
1. `Supplier` - Added new fields for complete supplier information
2. `Product` - Added updated_at timestamp
3. `InventoryMovement` - Added client/supplier relationships and additional fields
4. `MovementType` - Added name field
5. `Nfe` - Added movements relationship

## API Endpoints

### Clients
- `GET /api/clients` - List all clients
- `POST /api/clients` - Create a new client
- `PUT /api/clients` - Update an existing client
- `DELETE /api/clients?id={id}` - Delete a client

### Suppliers
- `GET /api/suppliers` - List all suppliers
- `POST /api/suppliers` - Create a new supplier
- `PUT /api/suppliers` - Update an existing supplier
- `DELETE /api/suppliers?id={id}` - Delete a supplier

### Movements
- `GET /api/movements` - List all movements
- `POST /api/movements` - Create a new movement
- `PUT /api/movements` - Update an existing movement
- `DELETE /api/movements?id={id}` - Delete a movement

## Frontend Pages

### New Pages
1. `/clientes/novo` - Create new client
2. `/fornecedores/novo` - Create new supplier
3. `/movimentacoes/nova` - Create new movement

### Updated Pages
1. `/clientes` - Client management with full CRUD
2. `/fornecedores` - Supplier management with full CRUD
3. `/movimentacoes` - Movement management with full CRUD

## Testing
After deployment, verify the implementation by:

1. Visiting the main pages:
   - http://your-domain.com/clientes
   - http://your-domain.com/fornecedores
   - http://your-domain.com/movimentacoes

2. Testing CRUD operations for each entity

3. Verifying API endpoints:
   - http://your-domain.com/api/clients
   - http://your-domain.com/api/suppliers
   - http://your-domain.com/api/movements

## Troubleshooting

### Database Connection Issues
If you encounter database connection issues:

1. Verify the `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in your environment variables
2. Ensure the Turso database is accessible
3. Check that the database is not overloaded

### Missing Tables
If you get "table not found" errors:

1. Ensure migrations have been applied (`npx prisma migrate deploy`)
2. Verify the migration files in `prisma/migrations/`
3. Check that the database user has proper permissions

### API Errors
If API endpoints return errors:

1. Check server logs for detailed error messages
2. Verify that the Prisma client was generated after schema changes
3. Ensure all required environment variables are set

## Rollback Plan
If issues occur after deployment:

1. Revert to the previous code version
2. If database migrations were applied, you may need to restore from a backup
3. Monitor application logs for any remaining issues

## Additional Notes
- The implementation follows the same design patterns as the existing product CRUD functionality
- All forms use the same UI components for consistency
- Error handling and loading states are implemented throughout
- The application is responsive and works on different screen sizes