import classNames from "classnames";
import { useAtom } from "jotai";
import { useRef, type KeyboardEvent } from "react";

import { SearchDiscardIcon, SearchIcon } from "@/assets/icons";
import { Button, Input } from "@/libs/ui";

import { inputValueAtom, submittedQueryAtom } from "../../store";

export const Search = () => {
  const [inputValue, setInputValue] = useAtom(inputValueAtom);
  const [submittedQuery, setSubmittedQuery] = useAtom(submittedQueryAtom);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    setSubmittedQuery(inputValue);
    inputRef.current?.blur();
  };

  const onEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const reset = () => {
    setSubmittedQuery("");
    setInputValue("");
  };

  return (
    <header
      className={classNames(
        "ease z-10 flex w-screen bg-white px-[16px] pt-[40px] pb-[16px] transition-all duration-300 lg:px-[80px]",
        submittedQuery
          ? "sticky top-0 justify-start"
          : "justify-center pt-[232px] lg:pt-[276px]",
      )}
    >
      <div className={classNames("flex w-full max-w-[512px] gap-[8px]")}>
        <Input
          ref={inputRef}
          className={classNames("grow", submittedQuery && "max-w-[420px]")}
          leftSection={<SearchIcon />}
          rightSection={
            inputValue && (
              <SearchDiscardIcon
                className="hover:cursor-pointer"
                onClick={reset}
              />
            )
          }
          placeholder="Телефоны, яблоки, груши..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={onEnter}
        />
        <Button onClick={handleSearch}>Искать</Button>
      </div>
    </header>
  );
};
