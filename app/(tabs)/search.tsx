import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getMovies } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [seacrhQuery, setSeacrhQuery] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["list movie", seacrhQuery],
    queryFn: getMovies,
  });

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="flex-1 absolute w-full z-0" />

      <FlatList
        data={data?.results}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="px-5"
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={seacrhQuery}
                onChangeText={setSeacrhQuery}
              />
            </View>

            {isLoading && (
              <ActivityIndicator
                size={"large"}
                color={"#0000ff"}
                className="my-3"
              />
            )}

            {isError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!isLoading &&
              !isError &&
              seacrhQuery.trim() &&
              data?.results.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Result for{" "}
                  <Text className="text-accent">{seacrhQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !isLoading && !isError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {seacrhQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => <MovieCard {...item} />}
      />
    </View>
  );
};

export default Search;
