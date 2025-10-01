import { Button, NumberInput, Table, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTenantCommissionByService, useUpdateTenantCommissions } from "../hooks/tenantCommissions.hooks";
import { updateTenantCommissionsSchema } from "../schema/tenantCommissions.schema";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useParams } from "react-router";

export default function TenantCommissionsPage() {

    const { serviceTemplateId } = useParams<{ serviceTemplateId: string }>();

  const { data: commissions } = useTenantCommissionByService(serviceTemplateId ?? "");
  const updateMutation = useUpdateTenantCommissions();

  console.log(commissions, 'fd')

  const form = useForm({
    initialValues: {
      serviceTemplateId: serviceTemplateId ?? "",
      splits: commissions?.splits?.map((c:any) => ({
        roleCode: c.roleCode,
        commissionPercentage: c.commissionPercentage,
        feePercentage: c.feePercentage,
      })) || [],
    },
    validate: zod4Resolver(updateTenantCommissionsSchema),
    // enableReinitialize: true,
  });

  return (
    <div>
      <Title order={3}>Tenant Commissions</Title>

      <form onSubmit={form.onSubmit(values => updateMutation.mutate(values))}>
        <Table withColumnBorders>
          <thead>
            <tr>
              <th>Role</th>
              <th>Commission %</th>
              <th>Fee %</th>
            </tr>
          </thead>
          <tbody>
            {form.values.splits.map((split, index) => (
              <tr key={index}>
                <td>{split.roleCode}</td>
                <td>
                  <NumberInput
                    min={0}
                    max={100}
                    {...form.getInputProps(`splits.${index}.commissionPercentage`)}
                  />
                </td>
                <td>
                  <NumberInput
                    min={0}
                    max={100}
                    {...form.getInputProps(`splits.${index}.feePercentage`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button type="submit" loading={updateMutation.isPending} mt="md">
          Save Commissions
        </Button>
      </form>
    </div>
  );
}
