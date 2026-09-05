import PageHeader from "../../components/layout/PageHeader";
import UserTable from "../../components/admin/UserTable";
import { SAMPLE_USERS } from "../../utils/sampleData";

export default function Users() {
  return (
    <div>
      <PageHeader title="Users" description="Internal team members and their access roles" />
      <UserTable users={SAMPLE_USERS} />
    </div>
  );
}
