import { useState } from "react";
import { Plus, Search } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import UserTable from "../../components/admin/UserTable";
import UserForm from "../../components/admin/UserForm";
import { MOCK_USERS } from "../../utils/adminMockData";

export default function Users() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = MOCK_USERS.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage internal team members and their access roles"
        actions={
          <Button variant="primary" icon={Plus} onClick={() => { setEditing(null); setOpen(true); }}>
            Add User
          </Button>
        }
      />

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search users by name or email..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <UserTable 
        users={filteredUsers} 
        onEdit={(c) => { setEditing(c); setOpen(true); }} 
      />

      <Modal 
        open={open} 
        onClose={() => setOpen(false)} 
        title={editing ? "Edit User" : "Add New User"}
        size="md"
      >
        <UserForm 
          initialValue={editing} 
          onSubmit={() => setOpen(false)} 
          onCancel={() => setOpen(false)} 
        />
      </Modal>
    </div>
  );
}