type Repo = {
    name: string;
    url: string;
    type: string;
};

type Props = {
    open: boolean;
    repos: Repo[];
    selectedIndex: number;
    onSelect: (index: number) => void;
};

export default function RepoDropdown({
                                         open,
                                         repos,
                                         selectedIndex,
                                         onSelect,
                                     }: Props) {
    if (!open) return null;

    return (
        <div className="absolute top-full left-0 mt-1 w-52 bg-[#111] border border-white/10 rounded-lg shadow-2xl z-[99999] overflow-hidden">

            {repos
                .filter((_, idx) => idx !== selectedIndex)
                .map((repo, idx) => {
                    const realIndex = repos.findIndex(r => r.name === repo.name);

                    return (
                        <button
                            key={idx}
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelect(realIndex);
                            }}
                            className="w-full text-left px-3 py-2 text-xs hover:bg-white/10 transition flex flex-col"
                        >
                            <div className="font-medium text-white">
                                {repo.name}
                            </div>
                            <div className="text-gray-400">
                                {repo.type}
                            </div>
                        </button>
                    );
                })}
        </div>
    );
}