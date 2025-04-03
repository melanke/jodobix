import { AddressInput } from "~~/components/scaffold-eth";

interface AddressInputListProps {
  addresses: string[];
  onChange: (addresses: string[]) => void;
}

export const AddressInputList: React.FC<AddressInputListProps> = ({ addresses, onChange }) => {
  const handleAddressChange = (value: string, index: number) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;

    if (index === addresses.length - 1 && value !== "") {
      newAddresses.push("");
    }

    const cleanedAddresses = newAddresses.filter((addr, idx) => addr !== "" || idx === newAddresses.length - 1);

    onChange(cleanedAddresses);
  };

  const removeAddress = (index: number) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    if (newAddresses.length === 0) {
      newAddresses.push("");
    }
    onChange(newAddresses);
  };

  return (
    <div className="space-y-2">
      {addresses.map((address, index) => (
        <div key={index} className="flex gap-2 items-center">
          <AddressInput value={address} onChange={value => handleAddressChange(value, index)} className="flex-1" />
          {address !== "" && (
            <button type="button" className="text-error" onClick={() => removeAddress(index)}>
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
