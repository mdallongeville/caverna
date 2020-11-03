import { ActionSpace, ActionSpaceId, Game } from "./Game";
import { EntityType, Mutation } from "./Mutation";
import { PlayerId } from "./Player";

export namespace GatherWood {
    export function execute(game: Game, playerId: PlayerId): Mutation<EntityType>[] {
        const bookActionSpaceMutations = bookActionSpace(ActionSpaceId.GATHER_WOOD, game, playerId);
        return [...bookActionSpaceMutations];
    }

    function bookActionSpace(
        actionSpaceId: ActionSpaceId,
        game: Game,
        playerId: PlayerId
    ): Mutation<EntityType>[] {
        const player = game.getPlayer(playerId);
        const dwarf = player.getFirstAvailableDwarf();
        return [
            { original: dwarf, diff: { isAvailable: false } },
            { original: game.actionBoard.getActionSpace(actionSpaceId), diff: { dwarf } },
        ];
    }

    export function createActionSpace() {
        return new ActionSpace(ActionSpaceId.GATHER_WOOD, execute);
    }
}