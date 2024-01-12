"use client";

import { useQuery } from "react-query";
import { fetchCountries } from "./action";
import CountryCard, {
  CountryCardSkeleton,
  CountryProp,
} from "@/components/CountryCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Searchbar from "@/components/Searchbar";
import { ChangeEvent, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export default function Home() {
  const [animationParent] = useAutoAnimate();

  const [searchTerm, setSearchTearm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredData, setFilteredData] = useState<CountryProp[] | undefined>(
    []
  );

  const {
    isLoading,
    error,
    data: countryData,
  } = useQuery<CountryProp[]>("countries", () => fetchCountries());

  // if (isLoading) return "Loading...";

  // todo : select regions
  const regions = [...new Set(countryData?.map((d) => d.region))];

  //xử lý onChange
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTearm(e.target.value);
  };

  //todo : xử lý filter

  const handleOnchangeFilter = (e: string) => {
    setSelectedCategory(e);
  };

  useEffect(() => {
    let data = countryData;

    if (searchTerm) {
      data = data?.filter((item) =>
        item.name.common
          ?.toLowerCase()
          .includes(searchTerm.trim().toLowerCase())
      );
    }

    if (selectedCategory || selectedCategory == "all") {
      data = data?.filter((item) => {
        if (selectedCategory == "all") {
          return item;
        }

        return item.region === selectedCategory;
      });
    }

    setFilteredData(data);
  }, [searchTerm, countryData, selectedCategory]);

  return (
    <div>
      <section className="mb-8 w-full flex flex-col sm:flex-row justify-between gap-4">
        {/* search bar */}
        <Searchbar onChange={handleChangeSearch} value={searchTerm} />
        {/* filter */}
        <Select onValueChange={handleOnchangeFilter} value={selectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All regions</SelectItem>
            {regions.map((d, i) => (
              <SelectItem key={i} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      <section
        ref={animationParent}
        className="flex flex-wrap gap-3 gap-y-9 md:justify-between justify-center "
      >
        {isLoading &&
          Array(10)
            .fill(null)
            .map((d, i) => <CountryCardSkeleton key={i} />)}
        {/*  */}
        {filteredData?.map((d, i) => (
          <CountryCard key={i} {...d} />
        ))}
        {/*  */}
        {Array.isArray(filteredData) && filteredData.length < 1 && (
          <NoSearchResults />
        )}
      </section>
    </div>
  );
}

function NoSearchResults() {
  return (
    <div className="text-center text-gray-600 dark:text-gray-400 mt-8 w-full text-3xl font-semibold">
      <p>Your search did not match any results :( </p>
    </div>
  );
}
