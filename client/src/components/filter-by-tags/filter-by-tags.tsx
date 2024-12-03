import { api } from "@/api";
import { ApiResponse, TagGetDto } from "@/types";
import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAsync } from "react-use";
import '@mantine/core/styles/PillsInput.css';
import { useFetch } from "@mantine/hooks";

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

export function TagFilter() {

    const fetchTags = useAsync(async () => {
        const response = 
        await api.get<TagGetDto[]>('/api/tags');
        console.log(response.data)
        return response.data;
        
    }, []);

      
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const [search, setSearch] = useState('');
    const [value, setValue] = useState<string[]>([]);

    const handleValueSelect = (val: string) =>
        setValue((current) =>
        current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
        );

    const handleValueRemove = (val: string) =>
        setValue((current) => current.filter((v) => v !== val));

    const values = fetchTags.value?.map((item) => (
        <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
        {item}
        </Pill>
    ));

    console.log(fetchTags.value);
    //console.log("tags",tags);
    console.log(groceries);

   const options = fetchTags.value?.filter((item) => (item ?? '').toLowerCase().includes(search.trim().toLowerCase()))?.map((item) => (
    
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
        </Group>
      </Combobox.Option>
    )); 

    return (
        <>
            <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
                <Combobox.DropdownTarget>
                    <PillsInput onClick={() => combobox.openDropdown()}>
                    <Pill.Group>
                        {value}
                        <Combobox.EventsTarget>
                        <PillsInput.Field
                            onFocus={() => combobox.openDropdown()}
                            onBlur={() => combobox.closeDropdown()}
                            value={search}
                            placeholder="Search values"
                            onChange={(event) => {
                            combobox.updateSelectedOptionIndex();
                            setSearch(event.currentTarget.value);
                            }}
                            onKeyDown={(event) => {
                            if (event.key === 'Backspace' && search.length === 0) {
                                event.preventDefault();
                                handleValueRemove(value[value.length - 1]);
                            }
                            }}
                        />
                        </Combobox.EventsTarget>
                    </Pill.Group>
                    </PillsInput>
                </Combobox.DropdownTarget>

                <Combobox.Dropdown>
                    <Combobox.Options>
                    { options }
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </>
    );
}