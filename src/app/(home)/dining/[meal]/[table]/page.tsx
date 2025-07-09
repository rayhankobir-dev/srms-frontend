"use client";
import { useParams } from "next/navigation";
import Order from "@/components/shared/Order";
import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/LoadingScreen";
import api, { endpoints } from "@/lib/api";
import { IMenuItem } from "@/types";

export default function OrderPage() {
  const [menus, setMenus] = useState<IMenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const meal = params.meal;
  const table = params.table;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(endpoints.menus);
        setMenus(data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="px-4">
        <h2 className="text-xl font-medium capitalize">{meal}</h2>
        <p>Table: {table}</p>
      </div>

      <section>
        {isLoading && <Loader />}
        {!isLoading && <Order menus={menus} />}
      </section>
    </div>
  );
}
