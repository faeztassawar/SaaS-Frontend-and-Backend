import Footer from "../components/Footer";
import Header from "../components/Header";
import UserTabs from "../components/UserTabs";

export default function UserPage() {
   
  
   
  
    return (
      <div className="flex flex-col min-h-screen">
        <Header isAdmin={true} />
        <div className="text-center mt-8 mb-12">
          <UserTabs isAdmin={true} />
        </div>
       
        <Footer />
      </div>
    );
  }
  