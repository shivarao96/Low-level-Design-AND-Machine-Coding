import { Select } from "./providers/SelectContext"
import { useState, useMemo } from "react"
export const SelectDropDownWithSearch = () => {
    
    const [selectedValue, setSelectedValue] = useState([]);
    const largeDataset = useMemo(
        () =>
          Array.from({ length: 10000 }, (_, i) => ({
            value: `item-${i + 1}`,
            label: `Item ${i + 1} - Option with longer text for testing`,
          })),
        []
      );


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Basic Select */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Basic Select with Search
                    </label>
                    <Select
                        value={selectedValue}
                        onChange={setSelectedValue}
                        placeholder="Select a country"
                        multiple={true}
                        virtualized={true}
                    >
                        <Select.Trigger />
                        <Select.Dropdown>
                            <Select.Search placeholder="Search countries..." />
                            <div style={{height: 340, overflow: "auto"}}>
                                <Select.List options={largeDataset} />
                            </div>
                        </Select.Dropdown>
                    </Select>
                    {selectedValue && (
                        <p className="mt-2 text-sm text-gray-600">
                            Selected: <span className="font-semibold">{selectedValue?.join(" ,")}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}