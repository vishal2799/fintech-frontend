import { useNavigate } from "react-router";
import {
  useCreateWLAdmin,
  useUpdateWLAdmin,
} from "../hooks/wl-admins.hooks";
import { useTenants } from "../hooks/tenants.hooks";
import { useForm } from "@mantine/form";
import {
  Button,
  Group,
  PasswordInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { zod4Resolver } from "mantine-form-zod-resolver";
import {
  createWLAdminSchema,
  updateWLAdminSchema,
  type CreateWLAdminInput,
} from "../schema/wl-admins.schema";
import type { WLAdmin } from "../types/wl-admin.types";
import { showError, showSuccess } from "../../../utils/notifications";

type Props = {
  mode: "create" | "edit";
  initialValues?: Partial<WLAdmin>;
};

export default function WLAdminForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();
  const { data: tenants = [] } = useTenants();
  const create = useCreateWLAdmin();
  const update = useUpdateWLAdmin();

  const schema = mode === "create" ? createWLAdminSchema : updateWLAdminSchema;

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      tenantId: "",
      ...initialValues,
    },
    validate: zod4Resolver(schema),
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (mode === "create") {
        const res = await create.mutateAsync(values as CreateWLAdminInput);
        showSuccess(res);
      } else if (initialValues?.id) {
        const res = await update.mutateAsync({
          id: initialValues.id,
          data: {
            ...values,
          }
        });
        showSuccess(res);
      }
      navigate("/wl-admins/list");
    } catch (err) {
      showError(err);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput label="Name" withAsterisk {...form.getInputProps("name")} />
        <TextInput label="Email" withAsterisk {...form.getInputProps("email")} />
        <TextInput label="Mobile" withAsterisk {...form.getInputProps("mobile")} />

        {mode === "create" && (
          <PasswordInput label="Password" withAsterisk {...form.getInputProps("password")} />
        )}

        <Select
          label="Tenant"
          data={tenants.map((t: any) => ({ label: t.name, value: t.id }))}
          {...form.getInputProps("tenantId")}
          disabled={mode === "edit"}
        />

        <Group mt="md">
          <Button type="submit" loading={create.isPending || update.isPending}>
            {mode === "create" ? "Create" : "Update"}
          </Button>
          <Button variant="light" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
