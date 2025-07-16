/* eslint-disable @next/next/no-img-element */
"use client";
import { Table, User } from "lucide-react";
import api, { endpoints } from "@/lib/api";
import { useEffect, useState } from "react";
import { IMenuItem, IOrder, ITable } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { Loader } from "@/components/ui/LoadingScreen";
import InvoiceForm from "@/components/shared/InvoiceForm";

export default function OrderPage() {
  const [table, setTable] = useState<ITable | null>(null);
  const [menus, setMenus] = useState<IMenuItem[]>([]);
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const router = useRouter();

  const meal = params.meal;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(
          `${endpoints.menus}?available=true&meal=${String(meal).toUpperCase()}`
        );
        setMenus(data);

        if (params.table) {
          const { data: tableInfo } = await api.get(
            `${endpoints.tables}/${params.table}`
          );
          setTable(tableInfo);
          if (tableInfo.status === "FREE") return;

          const { data: orderInfo } = await api.get(
            `${endpoints.tables}/${params.table}/orders?limit=1`
          );

          if (orderInfo.length === 0) return;
          console.log(orderInfo[0]);
          setOrder(orderInfo[0]);
        }
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [meal, params.table]);

  useEffect(() => {
    const orderMeal = order?.meal.toLowerCase();
    if (order && meal && meal !== orderMeal) {
      router.replace(
        `/dining/${String(order?.meal).toLowerCase()}/${order.table}`
      );
    }
  }, [meal, order, router]);

  return (
    <div className="space-y-6">
      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      )}
      {!isLoading && !table && (
        <p className="text-center py-10">Table not found</p>
      )}
      {!isLoading && table && (
        <>
          <div className="flex justify-between gap-4 px-4">
            <div>
              <h2 className="text-xl font-medium capitalize">{meal}</h2>
              <p className="max-w-sm">
                Please make sure you have enough food in your table.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <img src="/images/table.png" alt="table" className="w-16" />

              <div className="flex flex-col gap-0.5">
                <h2 className="inline-flex items-center gap-0.5 text-sm text-nowrap font-medium">
                  <Table size={14} /> {table?.name}
                </h2>
                <h2 className="inline-flex items-center gap-0.5 text-nowrap font-medium">
                  <User size={20} />
                  {table?.assignedStaff.firstName}{" "}
                  {table?.assignedStaff.lastName}
                </h2>
              </div>
            </div>
          </div>

          <InvoiceForm
            isEditMode={Boolean(order)}
            initialsValues={order}
            meal={String(meal).toUpperCase()}
            table={table}
            menus={menus}
          />
        </>
      )}
    </div>
  );
}
