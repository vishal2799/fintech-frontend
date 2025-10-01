import { Button, Loader, NumberInput, Table, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTenantCommissionByService, useUpdateTenantCommissions } from "../hooks/tenantCommissions.hooks";
import { updateTenantCommissionsSchema } from "../schema/tenantCommissions.schema";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useParams } from "react-router";
import { useEffect } from "react";

export default function TenantCommissionsPage() {
const { serviceTemplateId } = useParams<{ serviceTemplateId?: string }>();
const { data: commissions, isLoading } = useTenantCommissionByService(serviceTemplateId ?? "");
const updateMutation = useUpdateTenantCommissions();

const form = useForm({
  initialValues: {
    serviceTemplateId: serviceTemplateId ?? "",
    splits: [], // start empty
  },
  validate: zod4Resolver(updateTenantCommissionsSchema),
});

// Whenever commissions data arrives, populate the form
useEffect(() => {
  if (commissions?.splits) {
    form.setValues({
      serviceTemplateId: serviceTemplateId ?? "",
      splits: commissions?.splits.map((c: any) => ({
        roleCode: c.roleCode,
        commissionPercentage: c.commissionPercentage,
        feePercentage: c.feePercentage,
      })),
    });
  }
}, [commissions, serviceTemplateId]);


  return (
    <div>
      <Title order={3} mb={'md'}>Tenant Commissions</Title>

      <form onSubmit={form.onSubmit(values => updateMutation.mutate(values))}>
        <Table withColumnBorders>
          <thead>
            <tr>
              <th>Role</th>
              {commissions?.serviceTemplate?.template?.hasCommission === true ? <th>Commission %</th> : null}
              {commissions?.serviceTemplate?.template?.hasFee === true ? <th>Fee %</th> : null}
            </tr>
          </thead>
          <tbody>
            {form.values.splits.map((split, index) => (
              <tr key={index}>
                <td>{split.roleCode}</td>
                {commissions?.serviceTemplate?.template?.hasCommission === true ? (<td>
                  <NumberInput
                    min={0}
                    max={100}
                    {...form.getInputProps(`splits.${index}.commissionPercentage`)}
                  />
                </td>) : null}
                {commissions?.serviceTemplate?.template?.hasFee === true ? (<td>
                  <NumberInput
                    min={0}
                    max={100}
                    {...form.getInputProps(`splits.${index}.feePercentage`)}
                  />
                </td>) : null}
              </tr> 
            ))}
          </tbody>
        </Table>

        <Button type="submit" loading={updateMutation.isPending} mt="lg">
          Save Commissions
        </Button>
      </form>
    </div>
  );
}
