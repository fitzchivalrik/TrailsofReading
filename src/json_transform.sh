jq 'map( {kanji: .kanji, id: .id_kklc, keyword: .keyword_kklc,} )' kklc.json
jq 'map( {kanji: .character, id: .wk} ) | map(select(.id)) | map(select(.id != ""))' kanji_frequency_sorted.json
jq 'map( {kanji: .character, id: .jlpt} ) | map(select(.id)) | map(select(.id != ""))' kanji_frequency_sorted.json
jq 'map( {kanji: .character, id: .kanken} ) | map(select(.id)) | map(select(.id != ""))' kanji_frequency_sorted.json
jq 'map( {kanji: .character, id: .grade} ) | map(select(.id)) | map(select(.id != ""))' kanji_frequency_sorted.json
jq 'map( {kanji: .character, id: .frequency_rank} ) | map(select(.id)) | map(select(.id != ""))' kanji_frequency_sorted.json
jq 'map( {kanji: .character, id: .heisig_id5} ) | map(select(.id)) | map(select(.id != ""))' kanji_frequency_sorted.json
jq 'map( {kanji: .character, id: .heisig_id6} ) | map(select(.id)) | map(select(.id != ""))' kanji_frequency_sorted.json

# Deno.writeTextFileSync('./kklc-ids.json', JSON.stringify([...Deno.readDirSync('./data/kklc')].map(s=> s.name.substr(0,4)), null, undefined))

#> [1,2,3,4,5,6,7,8,9,10].forEach(gameid => {
# [...Deno.readDirSync(`./used_fnames/${gameid}`)].forEach(f => {
#   let s = JSON.parse(Deno.readTextFileSync(`./used_fnames/${gameid}/${f.name}`))
#   s.forEach(ss => {
#     delete ss.gameId
#     delete ss.fname
#     delete ss.scene
#     delete ss.opName
#     delete ss.jpnSearchText
#     delete ss.engSearchText
#   })
#   Deno.writeTextFileSync(`./used_fnames/${gameid}/${f.name}`, JSON.stringify(s,null,undefined) )
# })
# })