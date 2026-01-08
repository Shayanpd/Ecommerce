import db from "@/src/db/db";
import { PageHeader } from "../../../_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: PageProps) {
  // Await the params because in this Next.js version, it's async
  const { id } = await params;

  // Fetch only the fields your Client Component needs
  const product = await db.product.findUnique({
    where: { id },
  });

  // Handle case when product does not exist
  if (!product) {
    notFound();
  }

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
}