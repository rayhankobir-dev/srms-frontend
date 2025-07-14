/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Save } from "lucide-react";
import { ITable, User } from "@/types";
import api, { endpoints } from "@/lib/api";
import { useEffect, useState } from "react";
import Table from "@/components/shared/Table";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import Spinner from "@/components/shared/Spinner";
import { useTableStore } from "@/stores/tableStore";
import { SelectInput } from "@/components/ui/SelectInput";
import { ErrorMessage, FormikProvider, useFormik } from "formik";

const tableSchema = Yup.object({
  name: Yup.string().required("Table name is required"),
  assignedStaff: Yup.string().required("Assignee is required"),
});

function TableSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [staffs, setStaffs] = useState<User[]>([]);
  const [tableFetching, setTableFetching] = useState(false);
  const [selectedTable, setSelectedTable] = useState<ITable | null>(null);
  const { tables, addTable, updateTable, setTables } = useTableStore();

  const fetchTables = async () => {
    try {
      setTableFetching(true);
      const { data } = await api.get(endpoints.tables);
      setTables(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setTableFetching(false);
    }
  };

  const fetchStaffs = async () => {
    try {
      setIsFetching(true);
      const { data } = await api.get(endpoints.users);
      setStaffs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchStaffs();
    fetchTables();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: selectedTable?.name || "",
      assignedStaff: selectedTable?.assignedStaff._id || "",
    },
    validationSchema: tableSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        if (selectedTable) {
          const { data } = await api.put(
            `${endpoints.tables}/${selectedTable._id}`,
            values
          );
          updateTable(selectedTable._id, data);
          setSelectedTable(null);
          toast.success("Table updated successfully");
        } else {
          const { data } = await api.post(endpoints.tables, values);
          new Promise((resolve) => setTimeout(resolve, 1000));
          addTable(data);
          toast.success("Table created successfully");
        }
        resetForm();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tables Configure</CardTitle>
        <CardDescription>Create or delete tables</CardDescription>
      </CardHeader>
      <CardContent className="border-t">
        <form onSubmit={formik.handleSubmit}>
          <FormikProvider value={formik}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              <div className="col-span-2">
                <Label required htmlFor="name">
                  Table name
                </Label>
                <div className="space-y-0.5 mt-1">
                  <Input
                    id="name"
                    placeholder="Table name"
                    hasError={
                      formik.touched.name && formik.errors.name !== undefined
                    }
                    {...formik.getFieldProps("name")}
                  />
                  <ErrorMessage
                    className="text-rose-500 text-sm"
                    name="name"
                    component="p"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <Label required htmlFor="assignedStaff">
                  Assignee
                </Label>
                <div className="mt-1 space-y-0.5">
                  <SelectInput
                    isLoading={isFetching}
                    options={staffs.map((staff) => ({
                      value: staff._id,
                      label: `${staff.firstName} ${staff.lastName}`,
                    }))}
                    placeholder="Assignee staff"
                    hasError={
                      formik.touched.assignedStaff &&
                      formik.errors.assignedStaff !== undefined
                    }
                    {...formik.getFieldProps("assignedStaff")}
                    onChange={(value) => {
                      formik.setFieldValue("assignedStaff", value);
                    }}
                  />
                  <ErrorMessage
                    className="text-rose-500 text-sm"
                    name="assignedStaff"
                    component="p"
                  />
                </div>
              </div>

              <div className="col-span-1 pt-0.5">
                <Button
                  isLoading={isLoading}
                  loadingText="Saving.."
                  className="mt-6"
                >
                  <Save size={16} />
                  Save
                </Button>
              </div>
            </div>
          </FormikProvider>
        </form>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3 border-t pt-2">
        {tableFetching ? (
          <div className="w-full py-4 text-center text-sm text-muted-foreground">
            <Spinner />
          </div>
        ) : tables.length === 0 ? (
          <div className="w-full py-4 text-center text-sm text-muted-foreground">
            No tables found please create.
          </div>
        ) : (
          tables.map((table, index) => (
            <Table
              key={index}
              serial={String(index + 1)}
              table={table}
              status={
                selectedTable?._id === table._id ? "SELECTED" : table.status
              }
              onSelect={setSelectedTable}
            />
          ))
        )}
      </CardFooter>
    </Card>
  );
}

export default TableSettings;
