import { ActionSpace } from "./entity/ActionSpace";
import { Player } from "./entity/Player";
import { EntityMutation, EntityType } from "./entity/Mutation";
import { Resources } from "./entity/Resources";

export namespace ActionUtils {
    export function bookActionSpace(
        actionSpace: ActionSpace,
        player: Player
    ): EntityMutation<EntityType>[] {
        const dwarf = player.getFirstAvailableDwarf();
        return [
            { original: dwarf, diff: { isAvailable: false } },
            { original: actionSpace, diff: { dwarf } },
        ];
    }

    export function takeResources(
        actionSpace: ActionSpace,
        player: Player
    ): EntityMutation<EntityType>[] {
        return [
            { original: actionSpace, diff: { resources: new Resources() } },
            { original: player, diff: { resources: player.resources.add(actionSpace.resources) } },
        ];
    }
}