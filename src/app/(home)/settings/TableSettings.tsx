/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import * as Yup from "yup";
import { cx } from "@/lib/utils";
import { tv } from "tailwind-variants";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Edit, Save, Trash2 } from "lucide-react";
import { ErrorMessage, FormikProvider, useFormik } from "formik";
import { SelectInput } from "@/components/ui/SelectInput";
import api, { endpoints } from "@/lib/api";
import { useEffect, useState } from "react";
import { ITable, User } from "@/types";
import Spinner from "@/components/shared/Spinner";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const tableSchema = Yup.object({
  name: Yup.string().required("Table name is required"),
  assignedStaff: Yup.string().required("Assignee is required"),
});

function TableSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [staffs, setStaffs] = useState<User[]>([]);
  const [tables, setTables] = useState<ITable[]>([]);
  const [tableFetching, setTableFetching] = useState(false);
  const [selectedTable, setSelectedTable] = useState<ITable | null>(null);

  const fetchTables = async () => {
    try {
      setTableFetching(true);
      const { data } = await api.get(endpoints.tables);
      setTables(data);
    } catch (error) {
      console.error(error);
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
            endpoints.tables + "/" + selectedTable._id,
            values
          );
          setTables([
            ...tables.filter((table) => table._id !== selectedTable._id),
            data,
          ]);
          setSelectedTable(null);
          toast.success("Table updated successfully");
        } else {
          const { data } = await api.post(endpoints.tables, values);
          new Promise((resolve) => setTimeout(resolve, 1000));
          setTables([...tables, data]);
          toast.success("Table created successfully");
        }
        resetForm();
      } catch (error) {
        console.error(error);
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
          <Spinner />
        ) : (
          tables.map((table, index) => (
            <Table
              key={index}
              serial={String(index + 1)}
              table={table}
              variant={
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

type TableProps = {
  serial?: string;
  className?: string;
  name?: string;
  isEditMode?: boolean;
  href?: string;
  table: ITable;
  variant?: "RESERVED" | "FREE" | "SELECTED";
  onSelect?: (table: ITable) => void;
};

const tableStatusVariants = tv({
  base: ["w-40 relative overflow-hidden group"],
  variants: {
    variant: {
      RESERVED: ["bg-rose-100", "text-gray-900 dark:text-gray-50"],
      FREE: ["bg-white dark:bg-dark", "dark:text-white"],
      SELECTED: ["bg-gray-100"],
    },
  },
});

export function Table({
  isEditMode = true,
  className,
  serial,
  table,
  variant,
  href,
  ...props
}: TableProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await api.delete(endpoints.tables + "/" + table._id);
      new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <Card
      onClick={handleClick}
      className={cx(
        "cursor-pointer",
        tableStatusVariants({ variant: variant }),
        className
      )}
    >
      <CardContent className="relative aspect-square">
        <span className="absolute top-2 left-2 text-xs">TB-{serial}</span>
        <Badge className="absolute top-2 right-2">
          {table.assignedStaff.firstName}
        </Badge>
        <div className="h-full flex items-end justify-center">
          <img src="/images/table.png" alt={table.name} className="h-32 w-32" />
        </div>
        <CardTitle className="text-sm text-center truncate">
          {table.name}
        </CardTitle>
      </CardContent>

      {isEditMode && (
        <div className="cursor-pointer group-hover:flex hidden absolute top-0 right-0 w-full h-full justify-center items-center gap-1.5 bg-gray-800 bg-opacity-80 backdrop-blur-sm text-white duration-300">
          <Button
            onClick={() => props.onSelect?.(table)}
            variant="secondary"
            className="p-2"
          >
            <Edit size={16} />
          </Button>
          <Button
            isLoading={isDeleting}
            loadingText=""
            onClick={handleDelete}
            variant="destructive"
            className="p-2"
          >
            {!isDeleting && <Trash2 size={16} />}
          </Button>
        </div>
      )}
    </Card>
  );
}

export default TableSettings;
