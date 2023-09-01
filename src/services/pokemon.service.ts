import { Pokemon } from "../models/pokemon";

export class PokemonService{
 
  selecionarPokemonPorNome(nome: string): Promise<Pokemon>{
    const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;

    return fetch(url)
    .then((res: Response) => this.processarResposta(res))
    .then((obj: any): Pokemon => this.mapearPokemon(obj));
  }

  private processarResposta(resposta: Response): Promise<any>{
    if(resposta.ok)
    return resposta.json();

    throw new Error('Pokemon não Encontrado!');
  }

  private mapearPokemon(obj: any): Pokemon{
    return{
      id: obj.id,
      nome: obj.name,
      spriteUrl: obj.sprites.front_default
    };
  }
}