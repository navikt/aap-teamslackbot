import { App, BlockElementAction} from "@slack/bolt";
import {WorkplaceBlock} from "src/workplace/workplace-blocks";

const addOrRemoveUser = (block: WorkplaceBlock, userId: string) => {
    if(block.type === 'divider') {
        return;
    }
    const origMsg = block.text.text

    const userCount = (origMsg.match(/@/g) || []).length

    if (userCount > 0) {
        // Create array of all users in original message
        // Users are formatted like this: <@userId>
        let users: string[] = origMsg.substring(origMsg.indexOf("<")).split(",")
            .map((user: string) => user.trim())

        if (origMsg.includes(userId)) {
            users = users.filter(user => !user.includes(userId))
        } else {
            users.push(`<@${userId}>`)
        }

        // Strip text of users and user count
        const text = origMsg.substring(0, origMsg.indexOf("`")).trim()

        if (users.length) {
            block.text.text = `${text} \`${users.length}\`\n${users.join(', ')}`
        } else {
            block.text.text = text
        }
    } else {
        block.text.text = `${origMsg} \`1\`\n <@${userId}>`
    }

    return block;
}

const updateBlocks = async (username: string, blocks: WorkplaceBlock[], actions: BlockElementAction[]) => {
    const action = actions[0]

    return blocks.map((block) => {
        if( block.type !== 'section') {
            return block;
        } else if(action.type !== 'button') {
            return block;
        } else if (block.accessory.type === 'button' && block.accessory.value === action.value) {
            return addOrRemoveUser(block as WorkplaceBlock, username)
        } else {
            return block;
        }
    })
}

export function setupWorkplaceAction(app: App) {
    app.action('button_select_workplace', async ({action, ack, body, context}) => {
        await ack();
        if (action.type !== 'button' || body.type !== 'block_actions') {
            throw new Error(
              `button_select_workplace id used for something else than a button: ${action.type}, ${body.type}`,
            )
        }

        try {
            console.log(`select_workplace_action triggered by user @${body.user.username}`)
            const channelId = body.channel?.id;
            if(!channelId) {
                console.log(`channelid not found`)
                return
            }
            const blocks = await updateBlocks(body.user.id, body.message.blocks, body.actions)

            const result = await app.client.chat.update({
                token: context.botToken,
                ts: body.message.ts,
                channel: channelId,
                blocks,
                text: "Some random message..."
            })

            if (result.ok) {
                console.log('Message updated OK')
            } else {
                console.error(`Error on message update: ${result.error}`)
            }
        } catch (e) {
/*
            await app.client.chat.postEphemeral({
                token: context.botToken,
                channel: body.channel.id,
                user: body.user.id,
                text: "En feil oppsto..."
            })
*/
            console.error(e)
        }
    });
}
