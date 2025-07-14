"use client";

import Link from "next/link";
import { cx } from "@/lib/utils";
import { ITable } from "@/types";
import { Table2 } from "lucide-react";
import api, { endpoints } from "@/lib/api";
import { useParams } from "next/navigation";
import Table from "@/components/shared/Table";
import React, { useEffect, useState } from "react";
import { Loader } from "@/components/ui/LoadingScreen";
import { buttonVariants } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

function BreakfastPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [tables, setTables] = useState<ITable[]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(endpoints.tables);
        setTables(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTables();
  }, []);

  return (
    <div className="px-4">
      <Card>
        <CardHeader>
          <section className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-medium capitalize">{params.meal}</h2>
              <p className="font-light">Please make sure right table</p>
            </div>

            <div>
              <Link
                className={cx(buttonVariants({ variant: "secondary" }))}
                href="/settings"
              >
                <Table2 size={16} />
                Manage tables
              </Link>
            </div>
          </section>
        </CardHeader>

        <CardContent className="border-t pt-4">
          {isLoading ? (
            <div className="min-h-32 flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {tables.map((table, index) => (
                <Table
                  href={`/dining/${params.meal}/${table._id}?status=${table.status}`}
                  isEditMode={false}
                  key={index}
                  table={table}
                  status={table.status}
                  serial={String(index + 1)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default BreakfastPage;
