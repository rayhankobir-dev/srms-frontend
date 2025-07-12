/* eslint-disable @next/next/no-img-element */
"use client";
import { IMenuItem, ITable } from "@/types";
import { Table, User } from "lucide-react";
import api, { endpoints } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Order from "@/components/shared/Order";
import { Loader } from "@/components/ui/LoadingScreen";

export default function OrderPage() {
  const [table, setTable] = useState<ITable | null>(null);
  const [menus, setMenus] = useState<IMenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const meal = params.meal;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(endpoints.menus);
        setMenus(data);

        if (params.table) {
          const { data: tableInfo } = await api.get(
            `${endpoints.tables}/${params.table}`
          );
          setTable(tableInfo);
          console.log(tableInfo);
        }
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.table]);

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

          <Order
            meal={String(meal).toUpperCase()}
            table={table}
            menus={menus}
          />
        </>
      )}
    </div>
  );
}
