import { useEffect, useState } from "react";

type Client = {
  Name: string;
  Email: string;
  Template: string;
  RestaurantId: string;
  LastPaymentDate: string;
  NextPaymentDate: string;
};

const Clients = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/restaurantowner');
        console.log("CLIENTSSSS"  )
        if (response.ok) 
        {
          const data = await response.json();
          console.log("CLIENTSSSS" , data )
          const formattedClients = data.map((owner: any) => ({
            Name: owner.name || "N/A",
            Email: owner.email,
            Template: "N/A", 
            RestaurantId: owner.restaurant_id || "N/A",
            LastPaymentDate: "N/A", 
            NextPaymentDate: "N/A", 
           
          }));
          
          setClients(formattedClients);
        } else {
          console.error('Failed to fetch clients:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const deleteUser = async (index: number) => {
    const userEmail = clients[index].Email; 
    try {
      const response = await fetch('/api/restaurantowner', 
      {
        method: 'DELETE',
        body: JSON.stringify({ email: userEmail }), // Sending email  in the request body
      });
  
      if (response.ok) {
        console.log('User deleted successfully');

        //GPT --TO SHOW CHANGE IN FRONTEND 
/*slice(0, index): Takes all items before the specified index.
slice(index + 1): Takes all items after the specified index.
Combines them with the spread operator (...) to form a new array without the item at index.*/
        setClients((prevClients) => [
          ...prevClients.slice(0, index), 
          ...prevClients.slice(index + 1)
        ]);
        
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  const getPaymentStatus = (NextPaymentDate: string) => {
    const today = new Date();
    const paymentDate = new Date(NextPaymentDate);
    const timeDifference = paymentDate.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysDifference < 0) {
      return (
        <span className="ml-4 bg-red-600 text-white px-2 py-1 rounded">
          Overdue by {Math.abs(daysDifference)} days
        </span>
      );
    } else if (daysDifference === 0) {
      return (
        <span className="ml-4 bg-yellow-500 text-white px-2 py-1 rounded">
          Due Today
        </span>
      );
    } else {
      return (
        <span className="ml-4 bg-green-600 text-white px-2 py-1 rounded">
          Due in {daysDifference} days
        </span>
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-4xl font-bold">Clients</h1>
        <div className="flex flex-col w-full overflow-hidden">
          <div className="flex justify-between bg-[#2f2f2f] text-lg font-semibold py-3 px-4 rounded-t-lg">
            <div className="basis-1/5">Client Name</div>
            <div className="basis-2/5">Client Email</div>
            <div className="basis-1/5">Template</div>
            <div className="basis-1/5">Restaurant ID</div>
          </div>

          {clients.map((client, index) => (
            <div key={index}>
              <div
                className="flex justify-between bg-[#1f1f1f] py-4 px-4 transition-colors hover:bg-[#3f3f3f] cursor-pointer"
                onClick={() => toggleRow(index)}
              >
                <div className="basis-1/5 font-semibold">{client.Name}</div>
                <div className="basis-2/5 font-semibold truncate">
                  {client.Email}
                </div>
                <div className="basis-1/5 font-semibold">{client.Template}</div>
                <div className="basis-1/5 font-semibold">
                  {client.RestaurantId}
                </div>
              </div>

              {expandedRow === index && (
                <div className="bg-[#2f2f2f] p-4">
                  <p>
                    <strong>Last Payment Date:</strong> {client.LastPaymentDate}
                  </p>
                  <p className="flex items-center">
                    <strong>Next Payment Date:</strong> {client.NextPaymentDate}
                    {getPaymentStatus(client.NextPaymentDate)}
                  </p>
                  <button
                    className="mt-3 bg-red-600 text-white py-1 px-3 rounded"
                    onClick={() => deleteUser(index)}
                  >
                    Delete User
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
