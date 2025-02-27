import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create regular user
  const userPassword = await hash("user123", 12);
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "Regular User",
      password: userPassword,
      role: "USER",
    },
  });

  // Create categories
  const tshirts = await prisma.category.upsert({
    where: { slug: "t-shirts" },
    update: {},
    create: {
      name: "T-shirts",
      slug: "t-shirts",
      image: "/images/c-tshirts.jpg",
    },
  });

  const jeans = await prisma.category.upsert({
    where: { slug: "jeans" },
    update: {},
    create: {
      name: "Jeans",
      slug: "jeans",
      image: "/images/c-jeans.jpg",
    },
  });

  const shoes = await prisma.category.upsert({
    where: { slug: "shoes" },
    update: {},
    create: {
      name: "Shoes",
      slug: "shoes",
      image: "/images/c-shoes.jpg",
    },
  });

  // Create products for T-shirts category
  await prisma.product.upsert({
    where: { id: "tshirt-1" },
    update: {},
    create: {
      id: "tshirt-1",
      name: "Classic Cotton T-Shirt",
      description:
        "Comfortable classic cotton t-shirt perfect for everyday wear.",
      price: 29.99,
      images: ["/images/p11-1.jpg", "/images/p11-2.jpg"],
      stock: 100,
      categoryId: tshirts.id,
    },
  });

  await prisma.product.upsert({
    where: { id: "tshirt-2" },
    update: {},
    create: {
      id: "tshirt-2",
      name: "Premium Graphic T-Shirt",
      description: "Stylish graphic t-shirt with modern design.",
      price: 34.99,
      images: ["/images/p12-1.jpg", "/images/p12-2.jpg"],
      stock: 75,
      categoryId: tshirts.id,
    },
  });

  // Create products for Jeans category
  await prisma.product.upsert({
    where: { id: "jeans-1" },
    update: {},
    create: {
      id: "jeans-1",
      name: "Classic Blue Jeans",
      description: "Timeless classic blue jeans with perfect fit.",
      price: 59.99,
      images: ["/images/p21-1.jpg", "/images/p21-2.jpg"],
      stock: 50,
      categoryId: jeans.id,
    },
  });

  await prisma.product.upsert({
    where: { id: "jeans-2" },
    update: {},
    create: {
      id: "jeans-2",
      name: "Slim Fit Black Jeans",
      description: "Modern slim fit black jeans for a sleek look.",
      price: 64.99,
      images: ["/images/p22-1.jpg", "/images/p22-2.jpg"],
      stock: 45,
      categoryId: jeans.id,
    },
  });

  // Create products for Shoes category
  await prisma.product.upsert({
    where: { id: "shoes-1" },
    update: {},
    create: {
      id: "shoes-1",
      name: "Classic Sneakers",
      description: "Versatile classic sneakers for everyday comfort.",
      price: 79.99,
      images: ["/images/p31-1.jpg", "/images/p31-2.jpg"],
      stock: 30,
      categoryId: shoes.id,
    },
  });

  await prisma.product.upsert({
    where: { id: "shoes-2" },
    update: {},
    create: {
      id: "shoes-2",
      name: "Running Shoes",
      description: "High-performance running shoes with advanced cushioning.",
      price: 89.99,
      images: ["/images/p32-1.jpg", "/images/p32-2.jpg"],
      stock: 25,
      categoryId: shoes.id,
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
