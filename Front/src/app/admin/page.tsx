import AdminProtection from "@/views/AdminView/adminProtection"
import ChartsView from "@/views/ChartsView/ChartsView"

const AdmindDashboard: React.FC = () => {


  return (
    <div className="text-black">
      <AdminProtection />

      <ChartsView />
    </div>
  )
}

export default AdmindDashboard
