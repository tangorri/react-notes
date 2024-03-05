import { useState } from "react";

export default function Filters({filters, onFilterChanged}) {

  const onKeyWordChanged = e => {
    const keyword = e.target.value;
    onFilterChanged(keyword);
  };

  return (
    <form>
      <fieldset>
        <legend>Recherche une note</legend>
      <input name="keyword" type="search" placeholder="rechercher par mot" value={filters.keyword} onChange={onKeyWordChanged} />
      </fieldset>
    </form>
  );
}
