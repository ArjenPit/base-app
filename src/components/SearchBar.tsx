'use client'

import { Search } from "@mui/icons-material"
import { TextField, InputAdornment } from "@mui/material"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar({ placeholder, label }: {placeholder: string, label: string}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams)
        // params.set('page', '1');
        if (term) {
          params.set('query', term)
        } else {
          params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
      }, 300);

    return (
        <TextField
            fullWidth
            label={label}
            placeholder={placeholder}
            type="search"
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <Search />
                </InputAdornment>
                ),
            }}
            onChange={(e) => {
                handleSearch(e.target.value)
            }}
            defaultValue={searchParams.get('query')?.toString()}
            variant="standard"
        />
    )
}
   