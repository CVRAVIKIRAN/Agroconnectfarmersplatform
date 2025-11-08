import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FarmerDashboard } from './FarmerDashboard';
import { FarmerProfile } from './FarmerProfile';
import { ProductUpload } from './ProductUpload';
import { MyProducts } from './MyProducts';

export function FarmerDashboardNew() {
  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="dashboard" className="h-full">
        <div className="bg-primary text-white px-4 pt-4">
          <TabsList className="grid w-full grid-cols-4 bg-white/20">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-white data-[state=active]:text-primary">
              Home
            </TabsTrigger>
            <TabsTrigger value="upload" className="text-white data-[state=active]:bg-white data-[state=active]:text-primary">
              Upload
            </TabsTrigger>
            <TabsTrigger value="products" className="text-white data-[state=active]:bg-white data-[state=active]:text-primary">
              Products
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-white data-[state=active]:bg-white data-[state=active]:text-primary">
              Profile
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="flex-1 m-0">
          <FarmerDashboard />
        </TabsContent>

        <TabsContent value="upload" className="flex-1 m-0">
          <ProductUpload />
        </TabsContent>

        <TabsContent value="products" className="flex-1 m-0">
          <MyProducts />
        </TabsContent>

        <TabsContent value="profile" className="flex-1 m-0">
          <FarmerProfile />
        </TabsContent>
      </Tabs>
    </div>
  );
}
