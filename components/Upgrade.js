import Image from 'next/image';  // Add this import

// Define the Upgrade component that accepts props for customization
export default function Upgrade({ name, cost, count, description, onPurchase, canAfford, image }) {
  return (
    // Button container for the upgrade
    <button
      onClick={onPurchase}  // Handler passed from parent component
      className={`flex items-center w-full p-4 rounded-lg transition-colors ${
        canAfford 
          ? 'bg-amber-100 hover:bg-amber-200' 
          : 'bg-gray-100 cursor-not-allowed opacity-75'
      }`}
      disabled={!canAfford}  // Disable button if cost is invalid
    >
      {/* Add image container */}
      <div className="w-12 h-12 mr-4 relative flex-shrink-0">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain"
          sizes="48px"
        />
      </div>

      {/* Content */}
      <div className="flex-grow">
        <h3 className="font-bold text-amber-900">{name}</h3>
        <p className="text-sm text-amber-700">{description}</p>
        <p className="text-xs text-amber-600">Owned: {count}</p>
      </div>
      
      {/* Cost */}
      <span className={`font-bold ml-4 ${canAfford ? 'text-amber-800' : 'text-gray-600'}`}>
        {cost} cookies
      </span>
    </button>
  );
} 

